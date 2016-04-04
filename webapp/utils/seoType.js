
export default (text)=> {
    text = text.toLowerCase()
    if (text == 'condominium units') {
        text = "Condos";
    }
    if (text == 'multi family homes') {
        text = "Multi-Family Homes";
    }
    if (text == 'co op units') {
        text = "Co-ops";
    }
    if (text == 'townhouse townhomes') {
        text = "Townhomes";
    }
    if (text == 'raw lands') {
        text = "Raw Land";
    }
    return text;
}

