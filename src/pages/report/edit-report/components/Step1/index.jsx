import React from 'react'

import { Form, Select, Button, Divider } from 'antd'
import styles from './index.less';

const { Option } = Select
const formItemLayout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
};
class Step1 extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <>
                <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
                    <Form.Item {...formItemLayout} label="选择报告类型">
                        {getFieldDecorator('type', {
                            // initialValue: data.payAccount,
                            rules: [
                                {
                                    required: true,
                                    message: '请选择报告类型',
                                },
                            ],
                        })(
                            <Select placeholder="请选择">
                                <Option value="day">日报</Option>
                                <Option value="week">周报</Option>
                                <Option value="month">月报</Option>
                                <Option value="season">季报</Option>
                                <Option value="year">年报</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            xs: {
                                span: 24,
                                offset: 0,
                            },
                            sm: {
                                span: formItemLayout.wrapperCol.span,
                                offset: formItemLayout.labelCol.span,
                            },
                        }}
                        label=""
                    >
                        <Button type="primary">
                            下一步
                        </Button>
                    </Form.Item>
                </Form>
                <Divider
                    style={{
                        margin: '40px 0 24px',
                    }}
                />
                <div className={styles.desc}>
                    <h3>说明</h3>
                    <h4>日报</h4>
                    <p>
                        员工每天需撰写日报总结当天在公司完成的任务量
                    </p>
                    <h4>周报</h4>
                    <p>
                        如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
                    </p>
                </div>
            </>
        )
    }
}

export default Form.create()(Step1)