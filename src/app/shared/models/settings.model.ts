export class Settings {
    websiteAvailable: boolean;
    ordersAvailable: boolean;
    phone: string;
    email: string;
    address: string;
    facebookLink: string;
    instagramLink: string;
    homeDelivery: boolean;
    homeDeliveryCost: number;
    orderPreparationTime: number;

    monOpn: Date;
    monCls: Date;
    tueOpn: Date;
    tueCls: Date;
    wedOpn: Date;
    wedCls: Date;
    thuOpn: Date;
    thuCls: Date;
    friOpn: Date;
    firCls: Date;
    satOpn: Date;
    satCls: Date;
    sunOpn: Date;
    sunCls: Date;

    constructor({
        websiteAvailable,
        ordersAvailable,
        phone,
        email,
        address,
        facebookLink,
        instagramLink,
        homeDelivery,
        homeDeliveryCost,
        orderPreparationTime,
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
        let now: Date = new Date();
        this.websiteAvailable = websiteAvailable;
        this.ordersAvailable = ordersAvailable;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.facebookLink = facebookLink;
        this.instagramLink = instagramLink;
        this.homeDelivery = homeDelivery;
        this.homeDeliveryCost = homeDeliveryCost;
        this.orderPreparationTime = orderPreparationTime;
        this.monOpn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +monOpn.split(':')[0], +monOpn.split(':')[1], +monOpn.split(':')[2]);
        this.monCls = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +monCls.split(':')[0], +monCls.split(':')[1], +monCls.split(':')[2]);
        this.tueOpn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +tueOpn.split(':')[0], +tueOpn.split(':')[1], +tueOpn.split(':')[2]);
        this.tueCls = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +tueCls.split(':')[0], +tueCls.split(':')[1], +tueCls.split(':')[2]);
        this.wedOpn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +wedOpn.split(':')[0], +wedOpn.split(':')[1], +wedOpn.split(':')[2]);
        this.wedCls = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +wedCls.split(':')[0], +wedCls.split(':')[1], +wedCls.split(':')[2]);
        this.thuOpn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +thuOpn.split(':')[0], +thuOpn.split(':')[1], +thuOpn.split(':')[2]);
        this.thuCls = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +thuCls.split(':')[0], +thuCls.split(':')[1], +thuCls.split(':')[2]);
        this.friOpn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +friOpn.split(':')[0], +friOpn.split(':')[1], +friOpn.split(':')[2]);
        this.firCls = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +friCls.split(':')[0], +friCls.split(':')[1], +friCls.split(':')[2]);
        this.satOpn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +satOpn.split(':')[0], +satOpn.split(':')[1], +satOpn.split(':')[2]);
        this.satCls = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +satCls.split(':')[0], +satCls.split(':')[1], +satCls.split(':')[2]);
        this.sunOpn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +sunOpn.split(':')[0], +sunOpn.split(':')[1], +sunOpn.split(':')[2]);
        this.sunCls = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +sunCls.split(':')[0], +sunCls.split(':')[1], +sunCls.split(':')[2]);
    }
}