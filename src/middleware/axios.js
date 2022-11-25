import axios from 'axios'

// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

let Axios = axios.create({
    baseURL: "http://localhost:4000/api",
    timeout: 10000,
    headers: {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    }
})


async function objects(params = {}){
    try {
        console.log('axios', params);
        let a = await Axios.get('/object', {params})        
        return a  
    } catch (error) {
        throw error.response;
    }
}

async function objectDetails(id){
    try {
        let a = await Axios.get('/object/' + id)        
        return a  
    } catch (error) {
        throw error.response;
    }
}

async function add_object(data){
    try {
        let a = await Axios.post('/object', data);      
        return a  
    } catch (error) {
        console.log(error);
        throw error.response;
    }
}

async function update_object(data){
    try {
        let a = await Axios.patch('/object', data)        
        return a  
    } catch (error) {
        console.log(error);
        throw error.response;
    }
}

async function images(images){
    const headers = { 'Content-Type': 'multipart/form-data' };
    try {
        console.log('images');
        let a = await Axios.post('/images', images, { headers })   
        console.log(a);     
        return a;
    } catch (error) {
        console.log(error);
        throw error.response;
    }
}

async function removeImage(id){
    const headers = { 'Content-Type': 'multipart/form-data' };
    try {
        let a = await Axios.delete('/image/' + id)   
        console.log(a);     
    } catch (error) {
        console.log(error);
        throw error.response;
    }
}

async function register(body){
    try {
        let user = await Axios.post('/user', body)   ;
        return user;   
    } catch (error) {
        console.log(error);
        throw error.response;
    }
}

async function login(body){
    try {
        let user = await Axios.post('/user/login', body)   ;
        return user;   
    } catch (error) {
        console.log(error);
        throw error.response;
    }
}

async function tokenValidation(token){
    try {
        let valid = await Axios.post('/token/valid', {token});
        return valid;   
    } catch (error) {
        console.log(error);
        throw error.response;
    }
}

async function addPricelist(data){
    try {
        let a = await Axios.post('/pricelist', data);      
        return a  
    } catch (error) {
        throw error.response;
    }
}

async function updatePricelistItem(data){
    try {
        let a = await Axios.patch('/pricelist', data); 
        return a  
    } catch (error) {
        throw error.response;
    }
}

async function calculatePrice(data){
    try {
        let a = await Axios.post('/calculator', data); 
        return a  
    } catch (error) {
        throw error.response;
    }
}


async function removePricelistItem(id){
    try {
        let a = await Axios.delete('/pricelist/' + id);   
        return a; 
    } catch (error) {
        throw error.response;
    }
}

export {
    objects, 
    images, 
    add_object, 
    objectDetails, 
    removeImage, 
    update_object, 
    register, 
    tokenValidation,
    login,
    addPricelist,
    updatePricelistItem,
    removePricelistItem,
    calculatePrice
}
