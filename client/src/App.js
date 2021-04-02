import { useState } from 'react';
import axios from 'axios';
import { Typography, Button, Paper, Grid } from '@material-ui/core';
import './App.css';

function App() {
	const [type, setType] = useState('');
	const [ques, setques] = useState('');
	const [ans, setans] = useState('');
	const [exp, setexp] = useState('');
	//mcq options
	const [optionA, setoptionA] = useState('');
	const [optionB, setoptionB] = useState('');
	const [optionC, setoptionC] = useState('');
	const [optionD, setoptionD] = useState('');

	//axios request

	const oneWordHandler = async function () {
		setques('');
		setans('');
		setexp('');
		setoptionA('');
		setoptionB('');
		setoptionC('');
		setoptionD('');
		console.log('okay one word button clicked');
		const res = await axios.get('/api/oneword');
		setques(res.data.question);
		setType(res.data.type);

		setTimeout(() => {
			setans(res.data.answer);
			setTimeout(() => {
				setexp(res.data.explanation);
			}, 5000);
		}, 5000);

		console.log(res);
	};

	const mcqHandler = async function () {
		setques('');
		setans('');
		setexp('');
		setoptionA('');
		setoptionB('');
		setoptionC('');
		setoptionD('');
		console.log('okay one word button clicked');
		const res = await axios.get('/api/mcq');
		setques(res.data.question);
		setType(res.data.type);
		setoptionA(res.data.A);
		setoptionB(res.data.B);
		setoptionC(res.data.C);
		setoptionD(res.data.D);

		setTimeout(() => {
			setans(res.data.answer);
			setTimeout(() => {
				setexp(res.data.explanation);
			}, 5000);
		}, 5000);

		console.log(res);
	};

	return (
		<div className="App">
			<Typography variant="h2" style={{ marginTop: '20px', fontWeight: '500' }}>
				Live Quiz Module
			</Typography>
			<div style={{ marginTop: '50px' }}>
				<Button
					variant="contained"
					color="primary"
					style={{ padding: '8px', margin: '15px' }}
					onClick={oneWordHandler}
				>
					One Word Questions
				</Button>
				<Button
					variant="contained"
					color="primary"
					style={{ padding: '8px', margin: '15px' }}
					onClick={mcqHandler}
				>
					Multiple Choice Question
				</Button>
			</div>
			<div style={{ marginTop: '50px' }}>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="flex-start"
				>
					<Grid item xs={6}>
						<Paper style={{ height: '350px' }} elevation={5}>
							<Typography
								variant="h4"
								style={{ padding: '15px', color: '', paddingTop: '50px' }}
							>
								{ques}
							</Typography>
							{type === 'MCQ' && (
								<Grid
									container
									direction="row"
									justify="center"
									alignItems="flex-start"
								>
									<Grid item xs={3}>
										<Typography
											variant="h5"
											style={{ padding: '15px', color: '' }}
										>
											a) {optionA}
										</Typography>
									</Grid>
									<Grid item xs={3}>
										<Typography
											variant="h5"
											style={{ padding: '15px', color: '' }}
										>
											b) {optionB}
										</Typography>
									</Grid>
									<Grid item xs={3}>
										<Typography
											variant="h5"
											style={{ padding: '15px', color: '' }}
										>
											c) {optionC}
										</Typography>
									</Grid>
									<Grid item xs={3}>
										<Typography
											variant="h5"
											style={{ padding: '15px', color: '' }}
										>
											d) {optionD}
										</Typography>
									</Grid>
								</Grid>
							)}
							<Typography variant="h5" style={{ padding: '15px', color: '' }}>
								{ans}
							</Typography>
							<Typography variant="h6" style={{ padding: '15px', color: '' }}>
								{exp}
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default App;
