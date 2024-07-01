document.addEventListener("DOMContentLoaded", function() {
    const buttonx0 = document.getElementById('x0');
    const buttonx1 = document.getElementById('x1');
    const button_0 = document.getElementById('+0');
    const button_1 = document.getElementById('+1');
    const buttonCompare = document.getElementById('compare');
    const buttonReset = document.getElementById('reset');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const receiverTable = document.getElementById('receiverTable').getElementsByTagName('tbody')[0];
    const keyArray = [0,1,0,1,1,1,1,0,0,1];
    
    let photonIndex = 0;
    let newRun = 1;
    let dataArray = [];

    function addNewResult(photonIndex, base, result, signal) {
        photonIndex += 1;
        dataArray[photonIndex-1] = [photonIndex, base, result, signal]
        const newRow = dataTable.insertRow();
        const newCellIndex = newRow.insertCell(0);
        const newTextIndex = document.createTextNode(photonIndex);
        newCellIndex.appendChild(newTextIndex);
        const newCellBase = newRow.insertCell(1);
        const newTextBase = document.createTextNode(base);
        newCellBase.appendChild(newTextBase);
        const newCellResult = newRow.insertCell(2);
        const newTextResult = document.createTextNode(result);
        newCellResult.appendChild(newTextResult);
        const newCellSignal = newRow.insertCell(3);
        const newTextSignal = document.createTextNode(signal);
        newCellSignal.appendChild(newTextSignal);
    }

    function compareBase(dataArray, keyArray) {
        const rows = document.getElementById('receiverTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        let keyIndex = 0;
        if (newRun==1) {
            for (let i = 0; i < dataArray.length; i++) {
                newRun = 0;
                const row = rows[i];
                const photonIndex = dataArray[i][0]
                const base = dataArray[i][1]
                const signal = dataArray[i][3]

                const newRow = receiverTable.insertRow();
                const newCellIndexReceiver = newRow.insertCell(0);
                const newTextIndex = document.createTextNode(photonIndex);
                newCellIndexReceiver.appendChild(newTextIndex);

                const newCellBaseReceiver = newRow.insertCell(1);
                if (keyIndex>=keyArray.length) {
                    const randBase = Math.random() < 0.5 ? "+" : "x";
                    const newTextBaseReceiver = document.createTextNode(randBase);
                    newCellBaseReceiver.appendChild(newTextBaseReceiver);
                } else if (signal==keyArray[keyIndex]) {
                    const newTextBaseReceiver = document.createTextNode(base);
                    newCellBaseReceiver.appendChild(newTextBaseReceiver);
                    keyIndex += 1;
                } else if (base=="x") {
                    const newTextBaseReceiver = document.createTextNode("+");
                    newCellBaseReceiver.appendChild(newTextBaseReceiver);
                } else {
                    const newTextBaseReceiver = document.createTextNode("x");
                    newCellBaseReceiver.appendChild(newTextBaseReceiver);
                }
            }
        }
        }

    function reset() {
        console.log(document.getElementsByTagName('tr').length);
        let compareLength = document.getElementsByTagName('tr').length - photonIndex - 7
        for (let i = 0; i < photonIndex; i++) {
            document.getElementsByTagName('tr')[6].remove();
        }
        console.log(compareLength)
        for (let i = 0; i < compareLength; i++) {
            document.getElementsByTagName('tr')[7].remove();
        }
        newRun = 1;
        photonIndex = 0;
        dataArray = []
    }


    buttonx0.addEventListener('click', () => {
        addNewResult(photonIndex, "x", "\u2197", "0");
        photonIndex += 1;
    });

    buttonx1.addEventListener('click', () => {
        addNewResult(photonIndex, "x", "\u2196", "1");
        photonIndex += 1;
    });

    button_0.addEventListener('click', () => {
        addNewResult(photonIndex, "+", "\u2194", "0");
        photonIndex += 1;
    });

    button_1.addEventListener('click', () => {
        addNewResult(photonIndex, "+", "\u2195", "1");
        photonIndex += 1;
    });

    buttonCompare.addEventListener('click', () => {
        compareBase(dataArray, keyArray);
    });

    buttonReset.addEventListener('click', () => {
        reset();
    });


});