import { Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

export const MedNotes = () => {
	const [medNotes, setMedNotes] = useState([]);

	useEffect(() => {
		fetch('/api/mednotes')
			.then((response) => response.json())
			.then(({ data, ok }) => {
				console.log(data, ok);
				if (ok) setMedNotes(data)
			});
	}, []);

	const dataSource = medNotes.map(({ id, date, name, phone, problem }) => ({
		key: id,
		date: format(parseISO(date), 'dd.MM.yyyy HH:mm'),
		formattedDate: parseISO(date),
		name,
		phone,
		problem,
	}));

	const columns = [
		{
			title: 'Дата',
			dataIndex: 'date',
			key: 'date',
			sorter: (a, b) => a.formattedDate - b.formattedDate,
		},
		{
			title: 'ФИО',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Проблема',
			dataIndex: 'problem',
			key: 'problem',
		},
	];

	return (
		<>
			<Typography.Title>Заявки с формы</Typography.Title>
			<Table
				dataSource={dataSource}
				columns={columns}
				size="small"
				pagination={{
					pageSize: 6,
				}}
				style={{
					width: '100%',
					margin: '0 auto',
				}}
			/>
		</>
	);
};
