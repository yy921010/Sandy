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
      <form className="w-full max-w-xs flex flex-col gap-4" onSubmit={onSubmit}>
        <input placeholder="网站名称" name="name" className="input" required />
        <input placeholder="网站地址" name="url" className="input" required />
        <input
          className="input"
          name="avatar"
          placeholder="头像地址"
          required
        />
        <textarea name="desc" className="textarea" placeholder="网站描述" />
        <div className="flex justify-center w-full mt-4">
          <button type="submit" className="btn btn-primary">
            <Mail />
            Send me email
          </button>
        </div>
      </form>
    </div>
  );
}
