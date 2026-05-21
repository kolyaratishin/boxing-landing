export async function onRequestGet(context) {
    const defaultLinks = {
        stream: 'https://t.me/+8EZril-pgpQ4NTcy',
        usyk: 'https://cutt.ly/btB4nZNL5',
        verhoeven: 'https://cutt.ly/KtB4mgnz',
    };

    const savedLinks = await context.env.LANDING_LINKS.get('links', 'json');

    return Response.json(savedLinks || defaultLinks);
}