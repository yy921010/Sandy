import { Avatar, Chip } from "@nextui-org/react";
import { Mail } from "lucide-react";
import React from "react";
import { Config } from "~/config";

export default function Contact() {
  const [state, setState] = React.useState({
    name: "",
    avatar: "",
    url: "",
    desc: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const sendMeEmailHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(
      Config.social.email +
        `?subject=申请友链&body=网站名称：${state.name}%0D%0A头像地址：${state.avatar}%0D%0A网站地址：${state.url}%0D%0A网站描述：${state.desc}`
    );
  };

  return (
    <form className="form-control gap-4 md:max-w-md mx-auto">
      <label className="input input-bordered flex items-center gap-2">
        网站名称
        <input
          type="text"
          name="name"
          className="grow"
          value={state.name}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        头像地址
        <input
          type="text"
          className="grow"
          name="avatar"
          value={state.avatar}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        网站地址
        <input
          type="text"
          className="grow"
          name="url"
          value={state.url}
          onChange={handleChange}
        />
      </label>
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="网站描述"
        name="desc"
        value={state.desc}
        onChange={handleChange}
      ></textarea>
      <a onClick={sendMeEmailHandler} className="btn btn-primary">
        <Mail size={20} />
        Send me an email
      </a>
    </form>
  );
}
