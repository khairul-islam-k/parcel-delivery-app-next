import React from 'react';
import SendForm from './components/SendForm';

const sendParcel = () => {
    // console.log(process.env.MONGO_URI, process.env.DB_NAME)
    return (
        <div>
            <SendForm></SendForm>
        </div>
    );
};

export default sendParcel;