export default function(collections, value){
    const address = collections.filter(collection => (collection.address == value));
    return address.length > 0 ? true : false;
}
