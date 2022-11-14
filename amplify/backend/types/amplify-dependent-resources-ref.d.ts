export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "MeeterExpo": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "storage": {
        "s3meeterexpostorage": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "api": {
        "MeeterExpo": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    }
}