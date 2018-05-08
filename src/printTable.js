function printTable(headings, data) {
    const columnWidth = Math.max(
        ...headings.map(heading => heading.toString().length),
        ...data.map(row => Math.max(...row.map(e => e.toString().length))));
    const numColumns = headings.length;

    function printSeparator() {
        console.log('+' + (new Array(numColumns)).fill('-'.repeat(columnWidth + 2)).join('+') + '+');
    }

    function printRow(row) {
        console.log(`| ${row.map(e => e.toString().padEnd(columnWidth)).join(' | ')} |`);
    }

    printSeparator(numColumns);
    printRow(headings);
    printSeparator(numColumns);
    data.forEach(row => printRow(row));
    printSeparator(numColumns);
}

module.exports = {printTable};
