import { useEffect } from 'react';

export default function Islands() { console.log("before function ..");
    var myData : string[] = [];
    var bitArray : boolean[] = [];
    var bitColumns : number = 0;
    var bitRows : number = 0;
    var myHeader_text : string = "";
    var _bitColumns : string = "";
    
    function gridSearch() { console.log("Islands.tsx/gridSearch() logging ..");
        
        // get html elements
        const inputColumns : HTMLInputElement | null = document.querySelector("#inputColumns");
        const inputRows : HTMLInputElement | null = document.querySelector("#inputRows");
        const grid : HTMLElement | null = document.querySelector("#myGrid-container");
        const myHeader : HTMLElement | null = document.querySelector("#output-header");
        
        // parse values
        inputColumns && (bitColumns = parseInt(inputColumns.value));
        inputRows && (bitRows = parseInt(inputRows.value));

        // set grid's column style
        _bitColumns = "";
        for (var i = 0; i < bitColumns; i++)
            _bitColumns += "60px "
        _bitColumns.trim();

        console.log(`_bitColumns: ${_bitColumns}`);

        // clear grid
        if (grid)
            while (grid.firstChild != null)
                grid.removeChild(grid.firstChild);
        
        // create new grid
        var divGrid = document.createElement("div");
        divGrid.setAttribute("class", "dynamic-grid");
        divGrid.setAttribute("id", "myGrid");
        divGrid.setAttribute("style", "grid-template-columns: " + _bitColumns);

        // pre-loop variables
        var countIslands = 0;
        bitArray = new Array(bitColumns * bitRows * 2);
        // create grid elements
        for (var i = 0; i < bitColumns * bitRows; i++) {
            var divElement = document.createElement("div");
            divElement.setAttribute("class", "grid-styling");
            divElement.id = "griditem" + i;
            divGrid.appendChild(divElement);
            myData.push("");
            myData[i] = "A";
            if(Math.floor(Math.random() * 8) > 3) {
                bitArray[i] = true;
                divElement.style = "background: linear-gradient(315deg, darkslategray 9%, goldenrod 9%, rgb(255, 191, 16) 50%, bisque 75%); background-size: 300% 300%; background-position: 100% 100%;";
            }
            else {
                bitArray[i] = false;
                divElement.textContent = "*";
            }
            bitArray[i + bitArray.length / 2] = false;
        }
        grid && grid.appendChild(divGrid);
        console.log(myData);
        console.log(bitArray.join(", "));

        // recursion handler
        for (var i = 0; i < bitColumns * bitRows; i++) {
            console.log("entering for-loop");
            if (!bitArray[i + (bitArray.length / 2)]) { // Verify it's unchecked
                console.log("verified as unchecked");
                bitArray[i + (bitArray.length / 2)] = true; // Mark it as checked
                if (bitArray[i]) { // Check if it's an island
                    console.log("verified as island");
                    console.log("Island Set %i . .", ++countIslands);
                    RecursiveIsland(i); // Mark continuously adjacent island bits
                }
            }
        }

        // results
        console.log("Islands: %i", countIslands);
        if (myHeader)
            switch (countIslands) {
                case 0: myHeader.textContent = myHeader_text + " found no islands!"; break;
                case 1: myHeader.textContent = myHeader_text + " found 1 island!"; break;
                default: myHeader.textContent = myHeader_text + " found " + countIslands + " islands!";
            }
        // sendData(bitColumns, bitRows, countIslands);
    }

    function RecursiveIsland(index : number)
    {
        bitArray[index + (bitArray.length / 2)] = true; // Mark it as checked
        
        if (index % bitColumns != bitColumns - 1) { // Verify LEFT bit isn't out of bounds
            if (!bitArray[index + 1 + (bitArray.length / 2)] && bitArray[index + 1]) { // Verify it's unchecked & island
                console.log("0b%i went LEFT, ", index);
                RecursiveIsland(index + 1); // RecursiveIsland it
            }
        }
        if (index + bitColumns < bitArray.length / 2) { // Verify DOWN bit isn't out of bounds
            if (!bitArray[index + bitColumns + (bitArray.length / 2)] && bitArray[index + bitColumns]) { // Verify it's unchecked & island
                console.log("0b%i went DOWN, ", index);
                RecursiveIsland(index + bitColumns); // RecursiveIsland it
            }
        }
        if (index % bitColumns != 0) { // Verify RIGHT bit isn't out of bounds
            if (!bitArray[index - 1 + (bitArray.length / 2)] && bitArray[index - 1]) { // Verify it's unchecked & island
                console.log("0b%i went RIGHT, ", index);
                RecursiveIsland(index - 1); // RecursiveIsland it
            }
        }
        if (index - bitColumns > 0) { // Verify UP bit isn't out of bounds
            if (!bitArray[index - bitColumns + (bitArray.length / 2)] && bitArray[index - bitColumns]) { // Verify it's unchecked & island
                console.log("0b%i went UP, ", index);
                RecursiveIsland(index - bitColumns); // Run RecursiveIsland
            }
        }
        console.log("0b%i went BACK, ", index);
    }

    /*
    async function getData() { // to be updated ..
        try {
            const response = await fetch('http://localhost:3000/api/mytable/count');
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json);
            return json[0].no_of_rows;
        } catch (error : any) {
            console.error(error.message);
        }
    }
    
    async function sendData(columns : number, rows : number, islands : number) { // to be updated ..
        const id = await getData();
        const data = {
            id: id,
            grid_size: "" + columns + "x" + rows,
            island_count: islands
        }
        
        fetch ('http://localhost:3000/api/mytable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    } */

    function refreshEvents() {
        const elements = document.getElementsByClassName("grid-styling");
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('animationend', function(_e) {
                elements[i].classList.remove('animated-b');
            });
            elements[i].addEventListener('mouseover', function(_e) {
                elements[i].classList.add('animated-b');
            });
        }
    }

    useEffect(() => {
        const cleanups: (() => void)[] = []; // to hold cleanup functions

        const myHeader : HTMLElement | null = document.querySelector("#output-header");
        myHeader?.textContent && (myHeader_text = myHeader.textContent);
        
        const postForm = document.querySelector("#postForm");
        if (postForm) { // null check
            const handleSubmit = (e: Event) => { e.preventDefault();
                console.log('default form submission prevented!');
                /*
                const form : any = e.target;
                const formData = new FormData(form);
                formData.append('POST_Route', 'main');
                console.log(Object.fromEntries(formData));
                fetch(form.action, {
                    method: form.method, // Use the form's method (GET or POST)
                    body: formData, // Send the FormData object
                    // headers: {
                    //    'Content-Type': 'application/json'
                    // },
                }) */
                gridSearch();
                refreshEvents();
            };

            postForm.addEventListener('submit', handleSubmit);
            cleanups.push(() => postForm.removeEventListener('submit', handleSubmit));
        }

        const element_try_xmysql = document.querySelector("#try_xmysql");
        if (element_try_xmysql) { // null check
            const handleSubmit = (e: Event) => { e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form); // Automatically collect form data
                formData.append('POST_Route', 'xmysql');
                console.log(form.action);
                fetch(form.action, {
                    method: form.method, // Use the form's method (GET or POST)
                    body: formData, // Send the FormData object
                    // headers: { // Add headers here if needed, e.g. for JSON:
                    //    'Content-Type': 'application/json'
                    // },
                })
                // .then(response => response.json())
                // .then(data => console.log(data))
                // .catch(error => console.error(error));
                
                const thatElement : HTMLInputElement | null = document.querySelector("#that-element");
                thatElement && (thatElement.textContent = "Connected");
                thatElement && (thatElement.style = "text-decoration: line-through");
            };

            element_try_xmysql.addEventListener('submit', handleSubmit);
            cleanups.push(() => element_try_xmysql.removeEventListener('submit', handleSubmit));
        }

        // fish icon enhancement / animated-a initialization
        const element : Element | null = document.querySelector(".grid-styling");
        if (element)
        {
            const handleAnimationEnd = (_e : any) => {
                element.classList.remove('animated-a');
            };
            const handleMouseOver = (_e : any) => {
                element.classList.add('animated-a');
            };

            element.addEventListener('animationend', handleAnimationEnd);
            element.addEventListener('mouseover', handleMouseOver);
            
            cleanups.push(() => {
                element.removeEventListener('animationend', handleAnimationEnd);
                element.removeEventListener('mouseover', handleMouseOver);
            });
        }

        return () => { // cleanup
            cleanups.forEach((cleanup) => cleanup()); // execute all cleanup functions
        };
    }, []); // empty dependency array ensures this runs once on mount

    return (
        <>
            <h5 style={{float: "right"}}>Directory? <a style={{textDecoration: "underline"}}>@directory</a></h5>
            <h2 id="output-header">Recursive Search ..</h2>
            <div style={{float: "right"}}>
                <form id="try_xmysql" method="post">
                    <input id="that-element" className="button-styling" type="submit" value="Try XMySQL" />
                    <p id="this-element"> not implemented; xmysql availablity? @cmdOutput</p>
                </form>
            </div>
            <div className="input-container">
                <form id="postForm" method="post">
                    <input className="input-styling" type="number" id="inputColumns" min="1" name="inputColumns" placeholder="# of Columns .." />
                    <input className="input-styling" type="number" id="inputRows" min="1" name="inputRows" placeholder="# of Rows .." />
                    <input className="button-styling" type="submit" value="Submit" />
                </form>
            </div>
            
            {/* script */}

            <br />
            <div className="grid-container" id="myGrid-container">
                <div className="dynamic-grid" itemID="myGrid" style={{gridTemplateColumns: _bitColumns}}>
                    <div className="grid-styling">
                        <img className="fish-icon" src="./src/assets/i0_clown_fish.png" />
                    </div>
                </div>
            </div>

            {/* script replaced */}

        </>
    )
}
