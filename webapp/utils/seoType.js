export default (text)=> {
    if (text == 'Condominium Units') {
        text = "Condos";
    }
    if (text == 'Multi Family Homes') {
        text = "Multi-Family Homes";
    }
    if (text == 'Co Op Units') {
        text = "Co-ops";
    }
    if (text == 'Townhouse Townhomes') {
        text = "Townhomes";
    }
    if (text == 'Raw Lands') {
        text = "Raw Land";
    }
    return text;
}

