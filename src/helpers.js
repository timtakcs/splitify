function parseJwt(token) {
    try {
        const base64Payload = token.split('.')[1];
        
        const decodedPayload = atob(base64Payload);
    
        return JSON.parse(decodedPayload);
    } catch (e) {
        console.error("Parsing JWT failed", e);
        return null;
    }
}


export { parseJwt };