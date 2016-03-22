export default (timestamp)=>
new Date(timestamp).getMonth().toString() + "/" +
new Date(timestamp).getDate().toString() + "/" +
new Date(timestamp).getFullYear().toString();

