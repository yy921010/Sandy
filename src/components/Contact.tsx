import { Input, Button, Form, Textarea } from "@heroui/react";
import { Mail } from "lucide-react";
import type React from "react";
import { Config } from "~/config";
type Contact = {
	name: string;
	avatar: string;
	url: string;
	desc: string;
};

export default function ContactUser() {
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data: Contact = {
			name: formData.get("name") as string,
			avatar: formData.get("avatar") as string,
			url: formData.get("url") as string,
			desc: formData.get("desc") as string,
		};
		window.open(
			`${Config.social.email}?subject=申请友链&body=网站名称：${data.name}%0D%0A头像地址：${data.avatar}%0D%0A网站地址：${data.url}%0D%0A网站描述：${data.desc}`,
		);
	};

	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<Form
				className="w-full max-w-xs"
				validationBehavior="native"
				onSubmit={onSubmit}
			>
				<Input
					isRequired
					errorMessage="请输入站点名称"
					label="网站名称"
					name="name"
				/>
				<Input
					isRequired
					errorMessage="请输入网站地址"
					label="网站地址"
					name="url"
				/>
				<Input label="头像地址" name="avatar" />
				<Textarea label="网站描述" name="desc" />
				<div className="flex justify-center w-full mt-4">
					<Button type="submit" variant="flat" color="primary">
						<Mail />
						Send me email
					</Button>
				</div>
			</Form>
		</div>
	);
}
