import axios from 'axios'


let Axios = axios.create({
    baseURL: "http://localhost:4000/api",
    timeout: 10000
})


async function objects(params = {}){
    try {
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
        console.log(data);
        let a = await Axios.post('/object', data)        
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
        let a = await Axios.post('/images', images, { headers })   
        console.log(a);     
        // return a  
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


export {objects, images, add_object, objectDetails, removeImage, update_object}
