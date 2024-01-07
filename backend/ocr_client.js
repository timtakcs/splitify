const axios = require('axios');
const fs = require('fs').promises;
const env = require('dotenv').config({ path: './keys.env' });

const ocrClient = {
    async sendReceiptData(images) {
        const promises = images.map(async (image) => {
            try {
                const imageData = await fs.readFile(image.path);
                const config = {
                    method: 'POST',
                    headers: {
                        'Content-Type': image.mimetype,
                        'Ocp-Apim-Subscription-Key': process.env.AZURE_API_KEY,
                    },
                    url: process.env.AZURE_POST_URL,
                    data: imageData,
                };
                const response = await axios(config);
                return response.headers['apim-request-id'];
            } catch (error) {
                console.error("Error: " + error);
                return null;  
            }
        });

        return Promise.all(promises);
    },

    async getReceiptData(resultIDs) {
        const promises = resultIDs.map(resultID => 
            new Promise((resolve, reject) => {
                const pollForResult = async () => {
                    try {
                        const get_url = process.env.AZURE_GET_URL.replace('<resultID>', resultID);
                        const getResponse = await axios.get(get_url, {
                            headers: {
                                'Ocp-Apim-Subscription-Key': process.env.AZURE_API_KEY,
                            }
                        });

                        if (getResponse.status === 200 && getResponse.data.status === 'succeeded') {
                            resolve(getResponse.data.analyzeResult.documents[0].fields.Items.valueArray);
                        } else {
                            console.log('Data not ready for resultID:', resultID);
                            setTimeout(pollForResult, 1000); // Poll again after a delay
                        }
                    } catch (error) {
                        console.error('Error polling for result:', error);
                        reject(error); 
                    }
                };
                pollForResult();
            })
        );

        return Promise.all(promises);
    }
}

module.exports = ocrClient;