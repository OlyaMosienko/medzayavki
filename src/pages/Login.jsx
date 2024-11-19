import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const onFinish = async (data) => {
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		});

		const responseData = await response.json();

		if (responseData.ok) {
			navigate('/mednotes');
		}

		form.resetFields();
	};

	const validateMessages = {
		required: '${label} обязательно нужно заполнить!',
		types: {
			email: '${label} содержит неверный формат!',
		},
	};
	return (
		<>
			<Typography.Title level={3}>
				Войдите, чтобы просматривать заявки
			</Typography.Title>
			<Form
				layout="vertical"
				name="login"
				onFinish={onFinish}
				style={{
					width: 500,
				}}
				form={form}
				validateMessages={validateMessages}
			>
				<Form.Item
					name='email'
					label="Email"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='password'
					label="Пароль"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input type="password" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Войти
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};
