export default (text)=> "$" + text.trim().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

