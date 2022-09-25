declare namespace e {
  type MailTypes = {
    from: string;
    to: string;
    subject?: string;
    text?: string;
    html?: string;
  };

  type projectTypes = {
    name: string;
    repo: string;
    link: string;
    desc: string;
    stack: string[];
  };

  type MessageTypes = {
    name: string;
    email: string;
    subject?: string;
    phone?: string;
    message: string;
  };
}

export = e;
