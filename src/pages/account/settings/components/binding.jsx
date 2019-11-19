import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Icon, List, Menu, Dropdown, message } from 'antd';
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

@connect(({ accountSettings, user }) => ({
  managers: accountSettings.managers,
  currentUser: user.currentUser,
}))
class BindingView extends Component {
  state = {
    didbindManager: true,
    managerName: undefined,
  };

  componentDidMount() {
    const {
      dispatch,
      currentUser: { managerName },
    } = this.props;
    if (!managerName) {
      dispatch({
        type: 'accountSettings/fetchManagers',
      });
    }
    this.setState({ didbindManager: false });
  }

  bindingManager = manager => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/bindManager',
      payload: manager,
    });
    message.success(`绑定 ${manager.username}经理 成功！`);
    this.setState({
      didbindManager: true,
      managerName: manager.username,
    });
  };

  render() {
    const { managers = [] } = this.props;
    const { didbindManager, managerName } = this.state;

    const bindingManager = didbindManager
      ? {
          title: formatMessage(
            {
              id: 'account-settings.binding.manager',
            },
            {},
          ),
          description: formatMessage(
            {
              id: 'account-settings.binding.hasBound',
            },
            {},
          ),
          actions: [<a key="Bind">{managerName} 经理</a>],
          avatar: <Icon type="aliwangwang" className="alipay" />,
        }
      : {
          title: formatMessage(
            {
              id: 'account-settings.binding.manager',
            },
            {},
          ),
          description: formatMessage(
            {
              id: 'account-settings.binding.manager-description',
            },
            {},
          ),
          actions: [
            <Dropdown
              overlay={
                <Menu>
                  {managers.map(manager => (
                    <Menu.Item key={manager.id}>
                      <a onClick={() => this.bindingManager(manager)}>{manager.username}</a>
                    </Menu.Item>
                  ))}
                </Menu>
              }
            >
              <a key="Bind">
                <FormattedMessage id="account-settings.binding.bind" defaultMessage="Bind" />
                <Icon type="down" />
              </a>
            </Dropdown>,
          ],
          avatar: <Icon type="aliwangwang" className="alipay" />,
        };

    const data = [
      bindingManager,
      {
        title: formatMessage({
          id: 'account-settings.binding.alipay',
        }),
        description: formatMessage(
          {
            id: 'account-settings.binding.alipay-description',
          },
          {},
        ),
        actions: [
          <a key="Bind">
            <FormattedMessage id="account-settings.binding.bind" defaultMessage="Bind" />
          </a>,
        ],
        avatar: <Icon type="alipay" className="alipay" />,
      },
      {
        title: formatMessage(
          {
            id: 'account-settings.binding.dingding',
          },
          {},
        ),
        description: formatMessage(
          {
            id: 'account-settings.binding.dingding-description',
          },
          {},
        ),
        actions: [
          <a key="Bind">
            <FormattedMessage id="account-settings.binding.bind" defaultMessage="Bind" />
          </a>,
        ],
        avatar: <Icon type="dingding" className="dingding" />,
      },
    ];
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default BindingView;
