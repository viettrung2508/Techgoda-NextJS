export async function POST(request: Request) {
    const res = await request.json()
    const sessionToken = res.payload?.data?.token
    if (!sessionToken) {
        return Response.json(
            {
                messsage: 'khong nhan duoc session token'
            },
            {
                status: 400
            }
        )
    }
    return Response.json({
        res
    },
        {
            status: 200,
            headers: {
                'Set-Cookies': `sessionToken=${sessionToken}`
            }
        })
}