export enum Site {
  GITHUB = 'GITHUB',
  FACEBOOK = 'FACEBOOK',
  LINKEDIN = 'LINKEDIN'
}

export class ProfilePageLink {
  private _link: string;
  private _site: Site;

  constructor(link: string, site: Site) {
    this._link = link;
    this._site = site;
  }


  get link(): string {
    return this._link;
  }

  get site(): Site {
    return this._site;
  }

  public static toModelFromJson(data: any): ProfilePageLink {
    const link: string = data.link;
    const siteString: string = data.site;
    const site: Site = Site[siteString];
    return new ProfilePageLink(link, site);
  }
}
