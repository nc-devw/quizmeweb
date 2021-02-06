import styled from 'styled-components';

export const StyledNav = styled.nav`
	background-color: var(--clr-primary);
	padding: 1em;
	font-weight: 800;
	color: var(--clr-white);

	.nav-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	ul {
		display: flex;
		list-style: none;

		& > li + li {
			margin-left: 2em;
		}

		a:hover {
			color: var(--clr-dark);
			transition: 0.2s;
		}
	}
`;
