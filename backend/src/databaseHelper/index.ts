import mssql from 'mssql';
import { sqlConfig } from '../config';

interface Data {
    [x: string]: string | number | undefined;
}

export class DatabaseHelper {
    private static pool: Promise<mssql.ConnectionPool> = mssql.connect(sqlConfig);

    private static provideInputs(request: mssql.Request, data: Data = {}) {
        const keys = Object.keys(data);
        keys.forEach((key) => {
            const value = data[key];
            if (value !== undefined) {
                request.input(key, value);
            }
        });
        return request;
    }

    static async exec(storedProcedure: string, data: Data = {}) {
        let request: mssql.Request = (await DatabaseHelper.pool).request();
        request = DatabaseHelper.provideInputs(request, data);
        return await request.execute(storedProcedure);
    }

    static async query(queryString: string) {
        return (await DatabaseHelper.pool).request().query(queryString);
    }
}
