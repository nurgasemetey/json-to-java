import { useState } from 'react';
import { Row, Col, Card, PageHeader, Button } from 'antd';
import _ from 'lodash';

import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'

const JsonToJavaContainer = () => {

    const [input, setInput] = useState([{"name":"2112","test":12.5,"result":true,"obj":{"name":"1212"}},{"name":"2112","test":12.5,"result":true,"obj":{"name":"1212"}}])

    const [code, setCode] = useState("int b=1;")

    const onChange = (newValue) => {
        console.log("change", newValue);
    }

    const [mode, setMode] = useState("text")


    const convertObj = (obj) => {
        let str = "new HashMap<String, Object>() {{ \n"
        for (const [key, value] of Object.entries(obj)) {
            // console.log(`${key}: ${value}`);
            // console.log(_.isObject(value))
            if (_.isString(value)) {
                str += `put("${key}", "${value}");\n`
            }
            else if (_.isBoolean(value)) {
                str += `put("${key}", ${value});\n`
            }
            else if (_.isObject(value)) {
                str += `put("${key}", ${convertObj(value)});\n`
            }
            else {
                str += `put("${key}", ${value});\n`
            }
        }
        str += "}}\n"
        return str;
    }

    const convert = () => {

        const obj = input;

        // console.log(convertObj(obj));

        if (_.isArray(obj)) {
            // console.log("isarr");
            let str = "List<Map<String,Object>> list = new ArrayList() {{ \n";
            for (const item of obj) {
                // console.log(item);
                if (_.isArray(item)) {

                }
                else {
                    str += `add(${convertObj(item)});\n`
                }
            }
            str += '}};'
            console.log(str);
            console.log(window.js_beautify(str));
            setCode(window.js_beautify(str));
            // const formatted = Beautify.beautify(str);
            // setCode(formatted);
            // const highlightedCode = hljs.highlight(str, {
            //     language:"java"
            // })
            // console.log(highlightedCode)

        }
        else {
            let str = "Map<String,Object> map = ";
            str += convertObj(obj);
            str += ';\n';
            console.log(str);
            setCode(window.js_beautify(str));
            
        }
    }


    return (
        <div>

            <Row
                justify="center"
                align="middle"
                gutter={[0, 20]}
                className="todos-container"
            >
                <Col
                    xs={{ span: 23 }}
                    sm={{ span: 23 }}
                    md={{ span: 21 }}
                    lg={{ span: 20 }}
                    xl={{ span: 18 }}
                >

                    <PageHeader
                        title="Convert JSON to Java"
                    // subTitle="To add a todo, just fill the form below and click in add todo."
                    />
                </Col>
            </Row>

            <Row
                justify="center"
                align="middle"
                gutter={[20, 20]}
                className="todos-container"
            >
                <Col
                    xs={{ span: 23 }}
                    sm={{ span: 23 }}
                    md={{ span: 23 }}
                    lg={{ span: 10 }}
                    xl={{ span: 10 }}
                >
                    <Editor
                        id="JSONEditor"
                        mode={mode}
                        value={input}
                        onChange={setInput}
                    />

                </Col>
                <Col
                    xs={{ span: 2 }}
                    sm={{ span: 2 }}
                    md={{ span: 2 }}
                    lg={{ span: 2 }}
                    xl={{ span: 2 }}
                >
                    <Button type="primary"
                        onClick={convert}
                    >
                        Convert
                    </Button>

                </Col>
                <Col
                    xs={{ span: 23 }}
                    sm={{ span: 23 }}
                    md={{ span: 23 }}
                    lg={{ span: 10 }}
                    xl={{ span: 10 }}
                >
                    <AceEditor
                        mode="java"
                        theme="github"
                        onChange={onChange}
                        value={code}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        // commands={Beautify.commands}
                    />,

            </Col>
            </Row>
        </div>
    )

}


export default JsonToJavaContainer
