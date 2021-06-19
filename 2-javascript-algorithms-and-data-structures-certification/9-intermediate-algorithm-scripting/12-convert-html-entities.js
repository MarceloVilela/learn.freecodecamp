function convertHTML(str) {
    const searchReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
    };

    Object.keys(searchReplace).forEach(search => str = str
        .replace(new RegExp(search, 'g'), searchReplace[search])
    );

    return str;
}

convertHTML("Dolce & Gabbana");
