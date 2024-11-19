import { Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';

const validateMessages = {
	required: '${label} обязательно нужно заполнить!',
	types: {
		tel: '${label} содержит неверный формат!',
	},
};

export const FormPage = () => {
	const [form] = Form.useForm();
	const [submittable, setSubmittable] = useState(false);

	const onValuesChange = () => {
		form.validateFields()
			.then(() => {
				setSubmittable(true);
			})
			.catch(() => {
				setSubmittable(false);
			});
	};

	const onFinish = async (data) => {
		try {
			const response = await fetch('/api/mednote', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!response.ok) {
				throw new Error(`Ошибка: ${response.statusText}`);
			}

			form.resetFields();
			setSubmittable(false);
		} catch (e) {
			console.error('Ошибка при отправке данных:', e);
		}
	};

	return (
		<>
			<Typography.Title>Запись к врачу</Typography.Title>
			<Form
				layout="vertical"
				name="nest-messages"
				form={form}
				onFinish={onFinish}
				onValuesChange={onValuesChange}
				style={{
					width: 500,
				}}
				validateMessages={validateMessages}
			>
				<Form.Item
					name='name'
					label="ФИО"
					rules={[
					 	{
					 		required: true,
					 	},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='phone'
					label="Телефон"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input type="tel" />
				</Form.Item>
				<Form.Item name='problem' label="Опишите свою проблему">
					<Input.TextArea
						style={{
							height: 80,
							resize: 'none',
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" disabled={!submittable}>
						Отправить
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};
