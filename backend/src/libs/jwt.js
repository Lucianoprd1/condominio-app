import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export function createToken(payload) {
    return new Promise((resolve, reject) => { // Asegúrate de devolver la promesa
        jwt.sign(payload, TOKEN_SECRET, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
}