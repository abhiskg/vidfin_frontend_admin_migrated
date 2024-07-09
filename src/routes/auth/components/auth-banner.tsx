export function AuthSideBanner() {
  return (
    <section className="relative hidden lg:block">
      <div className="bg-cover bg-center">
        <img
          className="h-[calc(100vh-56px)] w-full object-cover object-center"
          src="/images/banner.jpg"
          alt="auth-banner"
        />
      </div>
      <div className="absolute inset-0  bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute bottom-20 ">
        <div className="w-full pl-10 pr-16">
          <h3 className="text-center text-4xl font-bold leading-snug text-white">
            Vidfin Admin Panel
          </h3>
        </div>
      </div>
    </section>
  );
}
