import { Link, Route, Routes } from 'react-router-dom';
import { Flex, Layout, Menu, Typography } from 'antd';
import { MedicineBoxTwoTone } from '@ant-design/icons';
import { FormPage, Login, MedNotes } from './pages';

const { Header, Footer, Content } = Layout;

const headerStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	textAlign: 'center',
	color: '#fff',
	paddingInline: 48,
};
const footerStyle = {
	textAlign: 'center',
	color: '#fff',
	backgroundColor: '#4096ff',
};
const layoutStyle = {
	overflow: 'hidden',
	width: '100%',
	minHeight: '100vh',
};
const navList = [
	{ key: 1, label: <Link to="/">Главная</Link> },
	{ key: 2, label: <Link to="/login">Заявки</Link> },
];

export const App = () => (
	<Layout style={layoutStyle}>
		<Header style={headerStyle}>
			<Typography.Title
				level={3}
				style={{
					margin: 'auto 0',
				}}
			>
				<Link
					to="/"
					style={{
						display: 'flex',
						gap: '6px',
					}}
				>
					<MedicineBoxTwoTone />
					МедЗаявки
				</Link>
			</Typography.Title>
			<Menu
				defaultSelectedKeys={['1']}
				theme="dark"
				mode="horizontal"
				items={navList}
				style={{
					flex: 1,
					minWidth: 0,
					marginLeft: '30px',
				}}
			/>
		</Header>
		<Content
			style={{
				background: '#f5f5f5',
				padding: '48px',
			}}
		>
			<Flex
				style={{
					width: '100vw - 48',
					borderRadius: 6,
					background: '#fff',
					height: '100%',
					padding: 24,
				}}
				vertical={true}
				justify="center"
				align="center"
			>
				<Routes>
					<Route path="/" element={<FormPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/mednotes" element={<MedNotes />} />
				</Routes>
			</Flex>
		</Content>
		<Footer style={footerStyle}>МедЗаявки ©{new Date().getFullYear()}</Footer>
	</Layout>
);
