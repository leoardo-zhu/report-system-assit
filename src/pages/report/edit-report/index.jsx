import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Card, Steps } from 'antd'

import styles from './style.less';

import Step1 from './components/Step1'

const { Step } = Steps
class StepForm extends React.Component {

  state = {
    currentStep: 0
  }

  render() {
    const { currentStep } = this.state

    let stepComponent

    switch (currentStep) {
      case 0:
        stepComponent = <Step1 />

      default:
        stepComponent = <Step1 />
    }

    return (
      <PageHeaderWrapper content='你可以填写周报月报还有其他报等'>
        <Card bordered={false}>
          <>
            <Steps current={currentStep} className={styles.steps} >
              <Step title="填写报告类型" />
              <Step title="填写报告" />
              <Step title="完成" />
            </Steps>
            {stepComponent}
          </>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default StepForm