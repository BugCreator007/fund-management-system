import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DollarOutlined,
  RollbackOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/payments',
      icon: <DollarOutlined />,
      label: '收款管理',
    },
    {
      key: '/refunds',
      icon: <RollbackOutlined />,
      label: '退款管理',
    },
    {
      key: '/invoices',
      icon: <FileTextOutlined />,
      label: '发票管理',
    },
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible>
        <div className="logo">资金管理系统</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <div style={{ padding: '0 24px', fontSize: '16px', fontWeight: 'bold' }}>
            欢迎使用资金管理系统
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
