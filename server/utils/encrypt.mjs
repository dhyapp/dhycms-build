import e from"crypto-js";const o="NHboiHOeLxFQ401C",i="a7Je3EILVrj2i9xN";function y(t,n=o,r=i){try{const c=e.enc.Utf8.parse(n),a=e.enc.Utf8.parse(r);var p=e.enc.Utf8.parse(t),s=e.AES.encrypt(p,c,{iv:a,mode:e.mode.CBC,padding:e.pad.Pkcs7});return s.toString()}catch(c){console.log(c)}}function f(t,n=o,r=i){try{const c=e.enc.Utf8.parse(n),a=e.enc.Utf8.parse(r);var p=e.AES.decrypt(t,c,{iv:a,mode:e.mode.CBC,padding:e.pad.Pkcs7}),s=p.toString(e.enc.Utf8);return s.toString()}catch(c){console.log(c)}}const g=(t,n=o)=>(t=n+t,e.enc.Base64.stringify(e.enc.Utf8.parse(t))),x=(t,n=o)=>{let r=e.enc.Utf8.stringify(e.enc.Base64.parse(t));return r=r.replace(new RegExp(`^${n}`),""),r};export{i as IV,o as KEY,x as base64Decode,g as base64Encode,f as decrypt,y as encrypt};