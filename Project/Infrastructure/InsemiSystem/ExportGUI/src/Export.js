import React from 'react';

class Export extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            
        }

    }

    render()
    {
        return(
            <div className = "export">
                <h1>Export Your Data</h1>

                <div className = "Buttons">
                <form>
                <h3>Select Report</h3>
                <select className = "ReportSelection">
                    <option key="0">Attendance Report</option>
                    <option key="1">Progress Report</option>
                    <option key="3">Employee Report</option>
                </select>
                <h3>Save as -</h3>
                <select className = "FileType">
                    <option key = "0">.xlsx</option>
                    <option key = "1">.docx</option>
                    <option key = "2">.pdf</option>
                    <option key = "3">.txt</option>
                    <option key = "4">.csv</option>
                    <option key = "5">.xml</option>
                </select>
                <button type="submit">Export!</button>            
                </form>
                </div>

            </div>
        );
    }




}

export default Export;