import * as Excel from 'exceljs'

const refCharMin = 97 //A
const refCharMax = 122 //Z

export class WorkbookWrapper {

    private refArray = ["A"]
    private ref: string = "A1"
    private runningRef: number = 0
    private workbook = new Excel.Workbook();
    private worksheet: Excel.Worksheet
    // private includePolicyFieldsAndValues = {
    //     name: "שם פוליסה",
    //     total_accumulations_amount: "",
    //     type: "סוג פוליסה", //policy type
    //     data_validity_date: "המידע נכון ל",
    //     status: "סטטוס",
    //     number: "מספר פוליסה",
    //     deposits: "הפקדות",
    //     accumulations: "צבירות",
    //     participants: "מוטבים",
    //     management_fee_from_accumulation: "אחוז דמי ניהול מצבירה",
    //     management_fee_from_deposit: "אחוז דמי ניהול מהפקדה",
    //     retirement: "",
    //     coverages: "כיסויים",
    //     disability_retirement : "פנסיה זקנה צפויה"
    // }

    initiateValues(){
        this.workbook = new Excel.Workbook();
        this.refArray = ["A"]
        this.ref = "A1"
        this.runningRef = 0
        this.worksheet = this.workbook.addWorksheet("Data");
        
    }

	/**
	 * Create excel file from object
	 *
	 */
    public async createFrom(formObj: {[key: string]: any}): Promise<Excel.Workbook> {
        try {
            this.initiateValues()
            // add a table to a sheet
            let cols = []
            let rows = []
            for (let field in formObj) {
                const element = formObj[field]
                if (Array.isArray(element) && element.length > 0) {
                    for (let key in element[0]) {
                        cols.push({ name: key })
                        this.runningRef++
                    }
                    element.forEach(e => {
                        rows.push(Object.values(e))
                    })
                    this.addTable('Table' + this.ref, rows, cols)
                    this.updateRef()
                    // this.ref = String.fromCharCode(this.runningRef + refCharMin).toUpperCase() + "1"
                    cols = []
                    rows = []
                } else if (element instanceof Object) {
                    for (let key in element) {
                        cols.push({ name: key })
                        this.runningRef++
                    }
                    rows.push(Object.values(element))
                    this.addTable('Table' + this.ref, rows, cols)
                    this.updateRef()
                    cols = []
                    rows = []
                } else { //just key value
                    cols.push({ name: field })
                    this.runningRef++
                    rows.push([element])
                    this.addTable('Table' + this.ref, rows, cols)
                    this.updateRef()
                    cols = []
                    rows = []
                }

            }
            this.worksheet.getCell('A1').protection = {
                locked : true
            }
            let res = await this.worksheet.protect('dave', {} );
            return this.workbook
        } catch (err) {
            throw err;
        }
    }

    private addTable(name: string, rows: any[][], cols: Excel.TableColumnProperties[]) {
        this.worksheet.addTable({
            name: name,
            ref: this.ref,
            headerRow: true,
            displayName: name,
            style: {
                theme: 'TableStyleDark3',
                showRowStripes: true,
            },
            columns: cols,
            rows: rows,
        });
    }

    private updateRef() {
        if (this.runningRef > refCharMax - refCharMin) {
            const divider = Math.floor(this.runningRef / (refCharMax - refCharMin))
            const modulo = this.runningRef % (refCharMax - refCharMin)
            for (let i = 0; i < divider; i++) {
                this.refArray.unshift('A')
            }
            this.refArray.pop()
            this.refArray.push(String.fromCharCode(modulo + refCharMin).toUpperCase())
            this.ref = this.refArray.join("") + "1"
            this.runningRef = 0
        } else {
            this.refArray.pop()
            this.refArray.push(String.fromCharCode(this.runningRef + refCharMin).toUpperCase())
            this.ref = this.refArray.join("") + "1"
        }
    }
}
