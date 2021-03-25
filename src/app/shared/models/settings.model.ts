export class Settings {
    phone: string;
    email: string;
    address: string;
    facebookLink: string;
    instagramLink: string;

    monOpn: string;
    monCls: string;
    tueOpn: string;
    tueCls: string;
    wedOpn: string;
    wedCls: string;
    thuOpn: string;
    thuCls: string;
    friOpn: string;
    firCls: string;
    satOpn: string;
    satCls: string;
    sunOpn: string;
    sunCls: string;

    constructor({
        phone,
        email,
        address,
        facebookLink,
        instagramLink,
        monOpn,
        monCls,
        tueOpn,
        tueCls,
        wedOpn,
        wedCls,
        thuOpn,
        thuCls,
        friOpn,
        friCls,
        satOpn,
        satCls,
        sunOpn,
        sunCls
    }) {
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.facebookLink = facebookLink;
        this.instagramLink = instagramLink;
        this.monOpn = monOpn;
        this.monCls = monCls;
        this.tueOpn = tueOpn;
        this.tueCls = tueCls;
        this.wedOpn = wedOpn;
        this.wedCls = wedCls;
        this.thuOpn = thuOpn;
        this.thuCls = thuCls;
        this.friOpn =friOpn;
        this.firCls = friCls;
        this.satOpn = satOpn;
        this.satCls = satCls;
        this.sunOpn = sunOpn;
        this.sunCls =sunCls;
    }
}