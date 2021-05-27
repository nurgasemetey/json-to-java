import { useState } from 'react';
import { Row, Col, Card, PageHeader, Button, Layout } from 'antd';
import _ from 'lodash';

import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import AceEditor from "react-ace";
import { GithubFilled, TwitterSquareFilled } from '@ant-design/icons';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import { RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
const { Header, Footer, Sider, Content } = Layout;

const JsonToJavaContainer = () => {

    const [input, setInput] = useState([{"name":"2112","test":12.5,"result":true,"obj":{"name":"1212"}},{"name":"2112","test":12.5,"result":true,"obj":{"name":"1212"}}])

    const [code, setCode] = useState("")

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
        <Layout>
            {/* <Header>Header</Header> */}
            <Content>
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
                        subTitle="Convert JSON to Java Map<String,Object>"
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
                        htmlElementProps={{ style: { height: 500 } }}
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
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            <Row
              justify="center"
              align="middle"
              gutter={[10, 10]}
            >
              <a
                href="https://github.com/nurgasemetey/json-to-java"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "16px" }}
              >
                  {/* a */}
                <GithubFilled /> Source code on Github
                </a>
                  -
              <a
                href="https://twitter.com/nurgasemetey"
                rel="noopener noreferrer"
                target="_blank"
                style={{ fontSize: "16px" }}
              >
                  {/* b */}
                <TwitterSquareFilled /> Follow me on Twitter
                </a>
            </Row>
            </Footer>
        </Layout>

        </div>
    )

}


export default JsonToJavaContainer
