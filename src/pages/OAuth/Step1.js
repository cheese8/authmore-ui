import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider } from 'antd';
import router from 'umi/router';
import styles from '@/pages/Forms/StepForm/style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ client, loading }) => ({
  checking: loading.effects['checkExistName'],
}))
@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, formData, checking } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'client/checkExistName',
            payload: values,
          });
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="应用名称">
            {getFieldDecorator('clientName', {
              rules: [{ required: true, message: '请输入应用名称' }],
            })(<Input placeholder="请输入应用名称" maxLength={15}/>)}
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label="">
            <Button type="primary" onClick={onValidateForm} loading={checking}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <p>这里的任何操作将直接影响线上现有应用的运行，请务必谨慎执行</p>
        </div>
      </Fragment>
    );
  }
}

export default Step1;
