import type { User } from '@/payload/payload-types';

export const getMailFooter = ({ user }: { user: User }) => `
		<br>
		<div>Pozdrawiam,</div>
		<br>
		<div style="display:flex;max-width:510px">
			<span style="font-size:18px;font-weight:bold;color:#4f4f4f;margin-right:auto">${user.fullName}</span>
			<a href="https://www.facebook.com/goldenlynxcars" style="margin-right:4px;height:24px;display:inline-block;background:#c69e00" target="_blank">
				<img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/facebook-icon-2x.png" alt="facebook" height="24" style="display:block">
			</a>
			<a href="https://www.facebook.com/goldenlynxcars" style="height:24px;display:inline-block;background:#c69e00" target="_blank">
				<img src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/instagram-icon-2x.png" alt="instagram" height="24" style="display:block">
			</a>
		</div>
		<div>Golden Lynx Cars</div>
		<img src="https://ci3.googleusercontent.com/mail-sig/AIorK4yORrnev3qGDimbwbcn4DlAURYBZnKraNRHbiCc2dbxMEDdHO87cSleUumghz5iwGitsAxUc5Y" width="420" height="277">
		<div style="margin-top:24px;margin-bottom:24px;width:215px;border-bottom:1px solid #c69e00"></div>
		<div style="display:flex;align-items:center">
			<img src="https://ci3.googleusercontent.com/meips/ADKq_NY-ugLnvhx8EKeU0NoFaQJxnwUBulA05De1Rj0lx5Itfo-At2BqiyZXrzXbvQpcbueon521QOzfNQ1y06xq7dVDLerq6ZY-nsYtDo9sdlsmC5ul1-T6XUQ4kEevfpeLQJDdM73VqUrTn1dnZ8Q_IA=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/phone-icon-2x.png" alt="phone" width="13" height="13" style="background:#c69e00;margin-top:auto;margin-bottom:auto">
			<a href="tel:${user.phoneNumber}" style="margin-left:16px;color:#4f4f4f">${user.phoneNumber}</a>
		</div>
		<div style="display:flex;align-items:center;margin-top:4px">
			<img src="https://ci3.googleusercontent.com/meips/ADKq_NZKllki1F8xHX3XP1B8cJ115cbaoAUYAu0XTemKLCDs4_mFQYcGkKTngars90NA25lBabg-0V6FL9Mdhi9cigSGVAoYg4fcRMPJxQoDUevRI9C9IJiurl0-cw3g5URKDFkoNJmeT24yAoCOJzjgkA=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon-2x.png" alt="email" width="13" height="13" style="background:#c69e00;margin-top:auto;margin-bottom:auto">
			<a href="mailto:contact@goldenlynxcars.com" style="margin-left:16px;color:#4f4f4f">contact@goldenlynxcars.com</a>
		</div>
		<div style="display:flex;align-items:center;margin-top:4px">
			<img src="https://ci3.googleusercontent.com/meips/ADKq_NZvHSmYu2-NCG_NPzpk6NN_gLctE_NdNQKl7PyZGOXUs0vhhus3sq6WQfnK-AYvhuwDc7H9-s1s_Oh-WV_dXppqqemufsUxJXZX8qrOyxW_1Ers_LaxvK1fdZqA5notV1_TjaMGyU0Sd9UgtjvB=s0-d-e1-ft#https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon-2x.png" alt="link" width="13" height="13" style="background:#c69e00;margin-top:auto;margin-bottom:auto">
			<a href="https://www.goldenlynxcars.com/" style="margin-left:16px;color:#4f4f4f">www.goldenlynxcars.com</a>
		</div>
	`;
