import { useState } from 'react';
import axios from 'axios';

export const postData = async (url: string, jsonData: string) => {
    const response = "";

    try {
        const response = await axios.post(url, jsonData);
        data = response.data;
    } catch (error) {
        data = error;
    }

    return data;
}
