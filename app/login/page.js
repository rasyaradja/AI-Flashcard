'use client';
import React, { useState } from 'react';
import { styled, keyframes } from '@mui/material/styles';
import {
	TextField,
	Button,
	Typography,
	IconButton,
	Snackbar,
	Alert,
} from '@mui/material';
import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase.config';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const ContentContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '100%',
	maxWidth: '1200px',
	marginTop: '100px',
});

const ServiceCard = styled('div')({
	width: '100%',
	maxWidth: '380px',
	backgroundColor: '#fff',
	borderRadius: '12px',
	boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
	padding: '20px',
	marginBottom: '20px',
	textAlign: 'center',
	animation: `${zoomIn} 0.6s forwards`,
});

const CardTitle = styled(Typography)({
	fontSize: '1.6rem',
	fontWeight: 'bold',
	color: '#2c3e50',
	marginBottom: '10px',
});

const CardDescription = styled(Typography)({
	fontSize: '1rem',
	color: '#7f8c8d',
	marginBottom: '20px',
});

const CardButton = styled(Button)({
	width: '100%',
	padding: '10px',
	borderRadius: '8px',
	background: 'linear-gradient(to right, #3498db, #2980b9)',
	color: '#fff',
	fontWeight: 'bold',
	textTransform: 'none',
	'&:hover': {
		background: 'linear-gradient(to right, #2980b9, #3498db)',
		transform: 'scale(1.05)',
	},
});

const ServiceCardsContainer = styled('div')({
	marginTop: '40px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

const Container = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
	background:
		'url(https://static.vecteezy.com/system/resources/previews/015/989/367/original/flash-card-icon-free-vector.jpg) no-repeat center center fixed',
	backgroundSize: 'cover',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '20px',
	opacity: 0,
	animation: `${fadeIn} 1s forwards`,
	position: 'relative',
});

const HeaderContainer = styled('div')({
	position: 'absolute',
	top: '20px',
	left: '50%',
	transform: 'translateX(-50%)',
	textAlign: 'center',
	zIndex: 1,
	marginBottom: '50px',
});

const HeaderTitle = styled(Typography)({
	fontSize: '3rem',
	fontWeight: 'bold',
	color: '#003366',
	marginBottom: '8px',
});

const HeaderSubtitle = styled(Typography)({
	fontSize: '1.8rem',
	color: '#003366',
});

const FormContainer = styled('div')({
	width: '100%',
	maxWidth: '380px',
	backgroundColor: '#fff',
	borderRadius: '12px',
	boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
	padding: '40px',
	animation: `${zoomIn} 0.6s forwards`,
	position: 'relative',
	zIndex: 1,
	marginTop: '100px',
});

const Header = styled('div')({
	textAlign: 'center',
	marginBottom: '30px',
});

const Title = styled(Typography)({
	fontSize: '1.8rem',
	fontWeight: 'bold',
	color: '#2c3e50',
	marginBottom: '8px',
});

const Subtitle = styled(Typography)({
	fontSize: '1.2rem',
	color: '#7f8c8d',
});

const StyledInput = styled(TextField)({
	marginBottom: '20px',
	width: '100%',
	transition: 'all 0.3s ease',
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderRadius: '8px',
			borderColor: '#ccc',
			transition: 'border-color 0.3s ease',
		},
		'&:hover fieldset': {
			borderColor: '#3498db',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#3498db',
		},
	},
	'& input': {
		padding: '14px',
	},
});

const StyledButton = styled(Button)({
	width: '100%',
	padding: '12px',
	borderRadius: '8px',
	background: 'linear-gradient(to right, #3498db, #2980b9)',
	color: '#fff',
	fontWeight: 'bold',
	transition: 'transform 0.3s ease, background 0.3s ease',
	'&:hover': {
		background: 'linear-gradient(to right, #2980b9, #3498db)',
		transform: 'scale(1.05)',
	},
});

const FooterLinks = styled('div')({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '20px',
	gap: '10px',
});

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');

	onAuthStateChanged(auth, (user) => {
		if (user) {
			sessionStorage.setItem(
				'user',
				JSON.stringify({ userId: user.uid })
			);
		}
	});

	const handleLogin = async (e) => {
		e.preventDefault();

		console.log(email, password);

		try {
			const res = await signInWithEmailAndPassword(auth, email, password);

			setSnackbarMessage('Login successful');
			setSnackbarSeverity('success');
			setSnackbarOpen(true);
			setTimeout(() => {
				window.location.href = '/flashcard-generator';
			}, 1500); // Delay to show Snackbar
		} catch (e) {
			console.log(e);
			setSnackbarMessage('Invalid email or password');
			setSnackbarSeverity('error');
			setSnackbarOpen(true);
		}

		// signInWithEmailAndPassword(auth,(auth,email,password))
		// .then((user)=>{

		//   setSnackbarMessage('Login successful');
		//   setSnackbarSeverity('success');
		//   setSnackbarOpen(true);
		//   setTimeout(() => {
		//     window.location.href = '/flashcard-generator';
		//   }, 1500);// Delay to show Snackbar
		// })
		// .catch((e)=>{

		// })
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	return (
		<Container>
			<HeaderContainer>
				<HeaderTitle>Flashcard SaaS</HeaderTitle>
				<HeaderSubtitle>
					Your gateway to effective learning
				</HeaderSubtitle>
			</HeaderContainer>
			<ContentContainer>
				<FormContainer>
					<Header>
						<Title>Welcome Back,</Title>
						<Subtitle>Log In!</Subtitle>
					</Header>
					<form onSubmit={handleLogin}>
						<StyledInput
							label="Email Address"
							type="email"
							variant="outlined"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<StyledInput
							label="Password"
							type={showPassword ? 'text' : 'password'}
							variant="outlined"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							InputProps={{
								endAdornment: (
									<IconButton
										onClick={togglePasswordVisibility}
									>
										{showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								),
							}}
						/>
						<FooterLinks>
							<Link href="/signup" passHref>
								<Typography
									variant="body2"
									color="primary"
									style={{ cursor: 'pointer' }}
								>
									Don't have an account? Register
								</Typography>
							</Link>
						</FooterLinks>
						<StyledButton type="submit">Log In</StyledButton>
					</form>
				</FormContainer>

				{/* Service Cards Section Below the Login Form */}
				<ServiceCardsContainer>
					<ServiceCard>
						<CardTitle>Basic Flashcard Service</CardTitle>
						<CardDescription>
							Access to basic flashcard creation tools with limited storage, ideal for
							students and educators.
						</CardDescription>
						<Link
							href="https://buy.stripe.com/test_eVacPk42623YgHCbII"
							passHref
						>
							<CardButton>Subscribe to Basic</CardButton>
						</Link>
					</ServiceCard>
					<ServiceCard>
						<CardTitle>Premium Flashcard Service</CardTitle>
						<CardDescription>
							Advanced features includes more storage
							and personalized learning tracks.
						</CardDescription>
						<Link
							href="https://buy.stripe.com/test_9AQg1w56acICaje3cd"
							passHref
						>
							<CardButton>Subscribe to Premium</CardButton>
						</Link>
					</ServiceCard>
				</ServiceCardsContainer>
			</ContentContainer>

			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarSeverity}
					sx={{ width: '100%' }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default Login;
