import Image from 'next/image';
import facebook from '../../assets/social-media/facebook.png';
import instagram from '../../assets/social-media/instagram.png';
import twitter from '../../assets/social-media/twitter.png';
import web from '../../assets/social-media/web.png';


function Icon({icon, size}) {
	switch (icon) {
		case 'facebook.' : return <div style={{height: `${size}px`, width: `${size}px`}}><Image alt="Restaurant" height={size} width={size} src={facebook}/></div>
		case 'x.' : return <div style={{height: `${size}px`, width: `${size}px`}}><Image alt='Beauty' height={size} width={size} src={twitter}/></div>
		case 'instagram.' : return <div style={{height: `${size}px`, width: `${size}px`}}><Image alt='Church' height={size} width={size} src={instagram}/></div>
		case 'website.' : return <div style={{height: `${size}px`, width: `${size}px`}}><Image alt="Teaching" height={size} width={size} src={web}/></div>

		default : return null;
	}
}

export default Icon;