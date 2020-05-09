import { Provider } from '@o-galaxy/ether/core';
import { OverrideValueType } from 'general-types'

@Provider()
export class CsvService {

    public parseCsvStringToObject<T extends { [key: string]: any}>(text: string): Array<OverrideValueType<T, string>> {
        const rows = text.split('\n');
        const keys = rows[0].split(',').map(k => k.trim());
        const values = rows.slice(1);

        const objectList = values.map(
            valueArray => (
                valueArray.split(',').map(v => v.trim()).reduce<OverrideValueType<T, string>>(
                    (o, val, i) => ({ ...o, [keys[i]]: val }),
                    ({} as any)
                )
            )
        );
        return objectList;
    }
}