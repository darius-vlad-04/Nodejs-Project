import fs from 'fs'

export default function writeJsonToFile(jsonObject) {
    fs.writeFile('./my_test_file.txt', JSON.stringify(jsonObject), 'utf8',
        (err) => {
            if (err) throw err;
            console.log("Data has been written to file!")
        })
}
