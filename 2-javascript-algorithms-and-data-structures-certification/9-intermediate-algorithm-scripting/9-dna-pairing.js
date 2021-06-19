function pairElement(str) {
    const basePairs = {
        'A': 'T',
        'T': 'A',
        'C': 'G',
        'G': 'C',
    }

    return str
        .split("")
        .map(item => ([item, basePairs[item]]));
}

pairElement("GCG");