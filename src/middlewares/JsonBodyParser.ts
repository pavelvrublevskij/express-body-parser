export class JsonBodyParser {

    readonly requestBody: string;
    private i = 0;

    constructor(requestBody: string) {
        this.requestBody = requestBody;
    }

    public parse() {
        this.skipSpaces();

        const value =
            this.parseString() ??
            this.parseNumber() ??
            this.parseObject() ??
            this.parseArray();
        this.skipSpaces();

        return 'OK';
    }

    private parseObject() {
        if (this.requestBody[this.i] === '{') {
            this.i++;
            this.skipSpaces();

            const result = {};

            let initial = true;
            while (this.requestBody[this.i] !== '}') {
                if (!initial) {
                    this.eatComma();
                    this.skipSpaces();
                }
                const key = this.parseString();
                this.skipSpaces();
                this.eatColon();
                result[key] = this.parse();
                initial = false;
            }
            this.i++;

            return result;
        }
    }

    private parseArray() {
        if (this.requestBody[this.i] === '[') {
            this.i++;
            this.skipSpaces();

            const result = [];
            let initial = true;
            while (this.requestBody[this.i] !== ']') {
                if (!initial) {
                    this.eatComma();
                }
                const value = this.parse();
                result.push(value);
                initial = false;
            }
            this.i++;

            return result;
        }
    }

    private skipSpaces() {
        while ([' ', '\n', '\t', '\r'].includes(this.requestBody[this.i])) {
            this.i++;
        }
    }

    private parseString() {
        if (this.requestBody[this.i] === '"') {
            this.i++;
            let result = '';
            while (this.requestBody[this.i] !== '"') {
                result += this.requestBody[this.i];
                this.i++;
            }
            this.i++;

            return result;
        }
    }

    private parseNumber() {
        const start = this.i;
        if (['-', '0'].includes(this.requestBody[this.i])) {
            this.i++;
        } else if (this.requestBody[this.i] >= '1' && this.requestBody[this.i] <= '9') {
            this.i++;
            while (this.requestBody[this.i] >= '0' && this.requestBody[this.i] <= '9') {
                this.i++;
            }
        }

        if (this.requestBody[this.i] === '.') {
            this.i++;
            while (this.requestBody[this.i] >= '0' && this.requestBody[this.i] <= '9') {
                this.i++;
            }
        }

        if (this.i > start) {
            return Number(this.requestBody.slice(start, this.i));
        }
    }

    private eatComma() {
        if (this.requestBody[this.i] !== ',') {
            throw new Error('Expected ",".');
        }
        this.i++;
    }

    private eatColon() {
        if (this.requestBody[this.i] !== ':') {
            throw new Error('Expected ":".');
        }
        this.i++;
    }
}
