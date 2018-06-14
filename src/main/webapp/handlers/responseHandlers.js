import Auth from '../security/auth';

export const checkResponseStatus = (response) => {
    if(response.status >= 200 && response.status < 300) {
        return response.json()
    }


    // redirect
    else if (response. status == 302) {
        console.log(response.json())
    }


    else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

export const loginResponseHandler = (response, handler) => {
    Auth.logIn(response);

    if(handler) {
        handler.call();
    }
};