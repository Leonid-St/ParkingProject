interface IJwtToken {
    token: string;
    expireDate: Date|null;
}

export default IJwtToken;
