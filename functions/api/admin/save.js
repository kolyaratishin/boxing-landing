export async function onRequestPost(context) {
    const { request, env } = context;

    const authHeader = request.headers.get('Authorization');
    const expectedToken = `Bearer ${env.ADMIN_PASSWORD}`;

    if (authHeader !== expectedToken) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const links = {
        stream: body.stream || '',
        usyk: body.usyk || '',
        verhoeven: body.verhoeven || '',
    };

    await env.LANDING_LINKS.put('links', JSON.stringify(links));

    return Response.json({ success: true, links });
}